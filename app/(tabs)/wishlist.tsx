import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState} from "react";
import {CardGrid} from "../components/CardGrid";
import {ScrollView, Sheet,} from 'tamagui';
import {BrowseFilterForm} from "../browse/components/BrowseFilterForm";
import {useWishlists} from "../../contexts/WishlistContext";
import {ActivityIndicator} from "react-native";
import {Card} from "../../classes/card";

const Tab = createMaterialTopTabNavigator();

export default function WishlistTabScreen() {
  const { wishlists } = useWishlists();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: "grey" },
        tabBarItemStyle: {
          flex: 1,
          minWidth: 'auto',
          width: 'auto',
        },
        swipeEnabled: true,
      }}
    >
      {
        wishlists.length === 0 && <Tab.Screen name="LOADING" children={() => <ActivityIndicator />} />
      }
      {wishlists.map(wishlist => (
        <Tab.Screen
          key={wishlist.id}
          name={wishlist.name}
          children={(props) => <WishlistScreen {...props} numColumns={2} cards={wishlist.cards} />}
        />
      ))}
    </Tab.Navigator>
  );
}

type WishlistScreenProps = {
  numColumns: number;
  cards: Card[];
};

function WishlistScreen({ numColumns, cards }: WishlistScreenProps) {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const submitFilterRequest = () => {
    setIsFilterOpen(false);
  };

  return (
    <>
      <ScrollView>
        <CardGrid cards={cards} numColumns={numColumns} route={"wishlist"} />
      </ScrollView>
      <Sheet
        forceRemoveScrollEnabled={isFilterOpen}
        modal={true}
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="medium"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" alignItems="center" backgroundColor={"$black2"}>
          <Sheet.ScrollView width={"100%"}>
            <BrowseFilterForm submitFilter={submitFilterRequest} />
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
