import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../RegistrationScreen/RegistrationScreen";
import LoginScreen from "../LoginScreen/LoginScreen";
import Home from "../Home/Home";
import PostsNav from "./PostsNav";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

const MainStack = createStackNavigator();
// const ProfileStack = createStackNavigator();

// const ProfileNav = () => {
//   return (
//     <ProfileStack.Navigator
//       initialRouteName="ProfileScreen"
//       screenOptions={{ headerShown: false }}
//     >
//       <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
//     </ProfileStack.Navigator>
//   );
// };

const AppNavigation = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="Login" component={LoginScreen} />
      <MainStack.Screen name="Registratione" component={RegistrationScreen} />
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="PostsNav" component={PostsNav} />
      
      <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </MainStack.Navigator>
  );
};

export default AppNavigation;
