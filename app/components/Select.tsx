import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useMemo, useState } from 'react'
import type { FontSizeTokens, SelectProps } from 'tamagui'
import { Adapt, Label, Select, Sheet, XStack, YStack, getFontSize } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

export function SelectDemoItem(props: { width?: string, label?: string, items: {label: string, value: string}[] } & SelectProps) {
  return (
    <Select disablePreventBodyScroll {...props}>
      <Select.Trigger width={props.width} iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
      </Select.Trigger>
      {/*<Adapt when="sm" platform="touch">*/}
      {/*  <Sheet*/}
      {/*    native={!!props.native}*/}
      {/*    modal*/}
      {/*    dismissOnSnapToBottom*/}
      {/*    animationConfig={{*/}
      {/*      type: 'spring',*/}
      {/*      damping: 20,*/}
      {/*      mass: 1.2,*/}
      {/*      stiffness: 250,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Sheet.Frame>*/}
      {/*      <Sheet.ScrollView>*/}
      {/*        <Adapt.Contents />*/}
      {/*      </Sheet.ScrollView>*/}
      {/*    </Sheet.Frame>*/}
      {/*    <Sheet.Overlay*/}
      {/*      animation="lazy"*/}
      {/*      enterStyle={{ opacity: 0 }}*/}
      {/*      exitStyle={{ opacity: 0 }}*/}
      {/*    />*/}
      {/*  </Sheet>*/}
      {/*</Adapt>*/}
      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            colors={['$background', 'transparent']}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>
        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            {props.label && <Select.Label>{props.label}</Select.Label>}
            {useMemo(
              () =>
                props.items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.value}
                      value={item.value}
                    >
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [props.items]
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'$4'}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
              />
            </YStack>
          )}
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            colors={['transparent', '$background']}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}