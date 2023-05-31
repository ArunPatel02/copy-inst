import { StatusBar } from 'expo-status-bar';
import { styled, withExpoSnack } from 'nativewind';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Post from './screens/Post';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import Hashtag from './screens/Hashtag';
import UserPage from './screens/UserPage';


const StyledView = styled(View)
const StyledText = styled(Text)

const Tab = createBottomTabNavigator();

const screen_width = Dimensions.get('screen').width;

// console.log(screen_width)

const Tab_width = ((screen_width * 11) / 12) - 8

const Each_tab_width = Tab_width / 3


function MyTabBar({ state, descriptors, navigation, ...rest }) {
  const [translateX] = useState(new Animated.Value(0))
  const [startingIndex, setStartingIndex] = useState(0)
  // console.log(translateX)
  const startAnimation = () => {
    Animated.timing(translateX, {
      toValue: state.index * Each_tab_width,
      useNativeDriver: true,
      duration: 300
    }).start()
  }
  // console.log(state)
  console.log(startingIndex, state.index)
  useEffect(() => {
    startAnimation()
    setTimeout(() => {
      setStartingIndex(state.index)
    }, 200);
  }, [state.index]);
  return (
    <StyledView className="h-20 w-full items-center justify-center absolute bottom-3 left-0 right-0 shadow-2xl">
      <StyledView className='h-full rounded-full bg-white w-11/12 flex flex-row items-center justify-between p-1' style={styles.boxShadow}>
        <Animated.View className='w-1/3 h-full rounded-full bg-[#393ec5] flex flex-row items-center justify-center absolute left-1' style={[styles.boxShift, { transform: [{ translateX: translateX }] }]}></Animated.View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const isFocusedSelected = index === startingIndex

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            state.history = []

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const TabStyleView = ({ children }) => {
            return <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              activeOpacity={1}
              onLongPress={onLongPress} className='w-1/3 h-full flex flex-row items-center justify-center'>
              {children}
            </TouchableOpacity>
          }

          return (
            <>
              {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text> */}
              {index === 0 ? <TabStyleView kay={index}><Feather name="menu" size={32} color={isFocusedSelected ? "white" : "black"} /></TabStyleView> : index === 1 ? <TabStyleView kay={index}><Fontisto name="hashtag" size={28} color={isFocusedSelected ? "white" : "black"} /></TabStyleView> : <TabStyleView kay={index}><MaterialIcons name="person-outline" size={38} color={isFocusedSelected ? "white" : "black"} /></TabStyleView>}
            </>
          );
        })}
      </StyledView>
    </StyledView>
  );
}

const Home = () => {
  return (
    <>
        <Tab.Navigator tabBar={props => <MyTabBar {...props} style={styles.boxShadow} />}>
          <Tab.Screen name="Posts" component={Post} options={({ navigation, route }) => ({
            headerTitle: (props) => <StyledText className='text-xl font-semibold'>Posts</StyledText>,
            headerRight: () => (
              <FontAwesome5 name="edit" size={24} color="#393ec5" style={{ marginRight: 10 }} />
            ),
            unmountOnBlur: true
          })} />
          <Tab.Screen name="Hastags" component={Hashtag} options={({ navigation, route }) => ({
            headerTitle: (props) => <StyledText className='text-xl font-semibold'>Hastags Group</StyledText>,
            headerRight: () => (
              <MaterialIcons name="add-box" size={30} color="#393ec5" style={{ marginRight: 10 }} />
            ),
            unmountOnBlur: true
          })} />
          <Tab.Screen name="Profile" component={UserPage} options={({ navigation, route }) => ({
            headerTitle: (props) => <StyledText className='text-xl font-semibold'>User Page</StyledText>,
            unmountOnBlur: true
          })} />
        </Tab.Navigator>
        {/* <Stack.Navigator>
          <Stack.Screen name="Posts" component={Post} options={({ navigation, route }) => ({
            headerTitle: (props) => <StyledText className='text-xl font-semibold'>Posts</StyledText>,
            // Add a placeholder button without the `onPress` to avoid flicker
            headerRight: () => (
              <FontAwesome5 name="edit" size={24} color="#393ec5" />
            ),
          })} />
        </Stack.Navigator> */}
    </>
  );
}

export default withExpoSnack(Home);

const styles = StyleSheet?.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  boxShift: {
    // transform: [{ translateX: 0 }]
  }
});


<View className="w-full h-[50px] items-center justify-center">
      <View
        className="h-full rounded-full bg-white w-full flex flex-row items-center justify-between"
        style={styles.boxShadow}
      >
        <Animated.View
          className="w-1/3 flex flex-row items-center justify-center absolute"
          style={[styles.boxShift, { transform: [{ translateX: translateX }] }]}
        >
          <View className="w-[65] h-[65] rounded-full bg-[#393ec5]"></View>
        </Animated.View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const isFocusedSelected = index === startingIndex;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            state.history = [];

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const TabStyleView = ({ children }) => {
            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                activeOpacity={1}
                onLongPress={onLongPress}
                className="w-1/3 h-full flex flex-row items-center justify-center"
              >
                {children}
              </TouchableOpacity>
            );
          };

          return (
            <>
              {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text> */}
              {index === 0 ? (
                <TabStyleView kay={index}>
                  <Feather
                    name="menu"
                    size={isFocusedSelected ? 36 : 28}
                    color={isFocusedSelected ? "white" : "gray"}
                  />
                </TabStyleView>
              ) : index === 1 ? (
                <TabStyleView kay={index}>
                  <Fontisto
                    name="hashtag"
                    size={isFocusedSelected ? 28 : 24}
                    color={isFocusedSelected ? "white" : "gray"}
                  />
                </TabStyleView>
              ) : (
                <TabStyleView kay={index}>
                  <MaterialIcons
                    name="person-outline"
                    size={isFocusedSelected ? 38 : 32}
                    color={isFocusedSelected ? "white" : "gray"}
                  />
                </TabStyleView>
              )}
            </>
          );
        })}
      </View>
    </View>