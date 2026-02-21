import {View, Image, ScrollView} from "react-native";
import {useRouter} from "expo-router";
import {icons} from "@/assets/constants/icons";
import SearchBar from "@/components/searchBar";

export default function Index() {
    const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
        <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                minHeight: "100%",
                paddingBottom: 10
            }}>

            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

            <View className="flex-1 mt-5">
                <SearchBar
                    onPress = {() => router.push("/search")}
                    placeholder='Search Movies'/>
            </View>
        </ScrollView>
    </View>
  );
}
