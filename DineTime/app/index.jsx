import { Image, ScrollView, Text, TouchableOpacity, View ,StatusBar} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import logo from '../assets/images/dinetimelogo.png'
import frame from '../assets/images/Frame.png'

export default function Index() {



  const router=useRouter()
  return (
    <SafeAreaView className={`bg-[#2b2b2b]`}>
         <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"}/>
          <ScrollView contentContainerStyle={{height:"100%"}}> 
             <View className="m-2 flex justify-center items-center">
                <Image source={logo} style={{width:300,height:300}}/>
                <View className="w-3/4">
                   <TouchableOpacity className="p-2 my-2 bg-[#f49b33] text-black rounded-lg" onPress={()=>router.push('/signup')}>
                       <Text className="text-xl font-semibold text-center">
                              Sign Up
                       </Text>
                   </TouchableOpacity>

                    <TouchableOpacity className="p-2 my-2 border border-[#f49b33] rounded-lg" onPress={()=>router.push('/home')}>
                       <Text className="text-xl font-semibold text-center text-[#f49b33]">
                              Guest User
                       </Text>
                   </TouchableOpacity> 
                </View>
                 <View>
                     <Text className="text-center text-base font-semibold my-4 text-white">
                        <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24"/> or{" "}
                        <View className="border-b-2 border-[#f49b33]  p-2 mb-1 w-24"/>
                     </Text>

                     <TouchableOpacity className="flex flex-row items-center justify-center" onPress={()=>router.push("/signin")}>
                        <Text className="text-semibold text-white">
                           Already a User? {" "}
                        </Text>
                        <Text className="text-base font-semibold underline text-[#f49b33]">
                           SignIn
                        </Text>
                     </TouchableOpacity>
                 </View>
             </View>
             <View className="flex-1">
                <Image source={frame} className="w-full h-full" resizeMode="contain"/>
             </View>
          </ScrollView>
    </SafeAreaView>
  );
}
