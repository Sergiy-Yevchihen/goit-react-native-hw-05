import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostList from "../../NestedScreens/PostList/PostList";
import Comments from "../../NestedScreens/Comments/Comments";
import Map from "../../NestedScreens/Map/Map";

const PostNavigation = createStackNavigator();

const NavigationPosts = () => {
  return (
    <PostNavigation.Navigator
      initialRouteName="PostList"
      screenOptions={{ headerShown: false }}
    >
      <PostNavigation.Screen name="PostList" component={PostList} />
      <PostNavigation.Screen name="Comments" component={Comments} />
      <PostNavigation.Screen name="Map" component={Map}></PostNavigation.Screen>
    </PostNavigation.Navigator>
  );
};

export default NavigationPosts;
