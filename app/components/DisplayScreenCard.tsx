import {Image} from "expo-image"
import {View} from "tamagui";
import '../../styles/cards/cards.css'
import HolographicCard from "./HolographicCard";
import {Card} from "../../classes/card";
import {Supertype} from "../../types/supertype";
import {Rarity} from "../../types/rarity";
import {useEffect, useState} from "react";

type DisplayScreenCardProps = {
  card: Card | null;
  handlePress?: () => void;
};

export const DisplayScreenCard = ({ card, handlePress }: DisplayScreenCardProps) => {
  const [maskUrl, setMaskUrl] = useState<string>("");
  const [foilUrl, setFoilUrl] = useState<string>("");
  
  const server = process.env.EXPO_PUBLIC_IMAGE_CDN;

  useEffect(() => {
    if(card) {
      const paddingRequiredSetIds = [/^swsh/, /^pgo/];
      if (card.set.id != "cel25c") {
        paddingRequiredSetIds.push(/^cel25/);
      }
      if (card.set.id != "sv3pt5") {
        paddingRequiredSetIds.push(/^sv/);
      }
      
      let number = paddingRequiredSetIds.some(regex => regex.test(card.set.id)) ? card.number.padStart(3, '0').toLowerCase() : card.number.toLowerCase()
      let setId = card.set.id;

      if (setId.startsWith('swsh') && setId.endsWith('tg')) {
        setId = setId.replace(/tg$/, '');
      }
      
      const potentialMaskUrl = `${server}/images/${setId}/masks/upscaled/${number}.webp`;
      const potentialFoilUrl = `${server}/images/${setId}/foils/upscaled/${number}.webp`;

      fetch(potentialMaskUrl)
        .then(response => {
          if (response.ok) {
            setMaskUrl(potentialMaskUrl);
          }
        });

      fetch(potentialFoilUrl)
        .then(response => {
          if (response.ok) {
            setFoilUrl(potentialFoilUrl);
          }
        });
    }
  }, [card]);
  
  const mapRarity = (rarity: string | undefined): string => {
    rarity = rarity?.toLowerCase() || "";
    const rarityMap = {
      "rare": "rare holo",
      "rare holo gx": "rare holo v",
      "illustration rare": "rare holo v",
      "special illustration rare": "rare rainbow alt",
      "rare holo ex": "rare holo v",
      "ultra rare": "rare ultra",
      "rare break": "rare secret",
      "hyper rare": "rare secret",
      "double rare": "rare holo v",
      "promo": mapPromoRarity(rarity)
    };

    return rarityMap[rarity] || rarity;
  };
  
  const mapPromoRarity = (rarity: string): string => {
    if(card?.subtypes.includes("VMAX")) {
      return "rare holo vmax";
    } else if(card?.subtypes.includes("V")) {
      return "rare holo v";
    } else if(card?.subtypes.includes("V-UNION")) {
      return "rare holo vunion";
    } else if(card?.subtypes.includes("GX")) {
      return "rare holo gx";
    } else if(card?.subtypes.includes("VSTAR")) {
      return "rare holo vstar";
    }
    return ""
  }

  return (
    <View style={{flex: 1}}>
      <HolographicCard 
        supertype={card?.supertype.toLowerCase()} 
        rarity={mapRarity(card?.rarity.toLowerCase())}
        subtypes={card?.subtypes.join(" ").toLowerCase()}
        // mask={"/assets/images/mask.png"}
        // foil={"/assets/images/foil.png"}
        mask={maskUrl}
        foil={foilUrl}
        number={card?.number}
        isTrainerGallery={!!card?.number.match(/^[tg]g/i)}
        // isTrainerGallery={"true"} 
        children={
          <Image
            placeholder={{
              uri: '/assets/images/placeholder.png'
            }}
            source={
              {
                uri: card?.images?.large,
                width: 733,
                height: 1024,
              }
            }
            style={{
              flex: 1,
              height: '100%'
            }}
            priority={"high"}
            pointerEvents={"none"}
            contentFit={"contain"}
            placeholderContentFit={"contain"}
            onTouchEndCapture={() => handlePress && handlePress()}
          />
        }
      />
    </View>
  );
}
