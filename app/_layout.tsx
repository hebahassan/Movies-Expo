import { Stack } from "expo-router";
import './globals.css';
import {useFonts} from "expo-font";
import {StatusBar} from "react-native";

export default function RootLayout() {
  const [fontLaded] = useFonts({
    SpaceMonoRegular: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  if (!fontLaded) return null;

  return (
      <>
        <StatusBar hidden={true}/>
        <Stack>
          <Stack.Screen
              name="(tabs)"
              options={{headerShown: false}}/>
        </Stack>
      </>
  )
}
