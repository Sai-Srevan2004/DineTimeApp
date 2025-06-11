import { View, Text, ScrollView, Platform, FlatList, Dimensions, Image, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import { Ionicons } from '@expo/vector-icons'
import DatePicker from '../../components/restaurant/DatePicker'
import GuestPicker from '../../components/restaurant/GuestPicker'
import FindSlots from '../../components/restaurant/FindSlots'


const Restaurant = () => {
    const { restaurant } = useLocalSearchParams()
    const windowWidth = Dimensions.get("window").width
    const FlatListRef = useRef(null)
    const [restaurantData, setRestaurantData] = useState({})
    const [carouselData, setCarouselData] = useState([])
    const [slotsData, setSlotsData] = useState([])
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [currectIndex, setCurrentIndex] = useState(0)
    const [date, setDate] = useState(new Date())
    const [selectedNumber, setSelectedNumber] = useState(0)

    const handleImageNext = () => {
        let len = carouselData[0]?.images.length
        if (currectIndex < len - 1) {
            const nextIndex = currectIndex + 1;
            setCurrentIndex(nextIndex)
            FlatListRef.current.scrollToIndex({ index: nextIndex, animated: true })
        }

        if (currectIndex === len - 1) {
            const nextIndex = 0;
            setCurrentIndex(nextIndex)
            FlatListRef.current.scrollToIndex({ index: nextIndex, animated: true })
        }
    }

    const handleImagePrev = () => {
        let len = carouselData[0]?.images.length
        if (currectIndex > 0) {
            const PrevIndex = currectIndex - 1;
            setCurrentIndex(PrevIndex)
            FlatListRef.current.scrollToIndex({ index: PrevIndex, animated: true })
        }

        if (currectIndex === 0) {
            const PrevIndex = len - 1;
            setCurrentIndex(PrevIndex)
            FlatListRef.current.scrollToIndex({ index: PrevIndex, animated: true })
        }
    }


    const carouselItem = ({ item }) => {
        return (
            <View style={{ width: windowWidth - 2 }} className="h-64 relative">
                <View style={{ position: "absolute", top: "50%", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 50, padding: 5, right: "6%", zIndex: 10 }}>
                    <Ionicons onPress={handleImageNext} name='arrow-forward' size={24} color="white" />
                </View>
                <View style={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    left: "50%",
                    transform: [{ translateX: -50 }],
                    zIndex: 10,
                    bottom: 15
                }}>
                    {
                        carouselData[0]?.images?.map((_, i) => (
                            < View key={i}
                                className={`bg-white h-2 w-2
                                ${i === currectIndex && "h-3 w-3"} p-1 mx-1 rounded-full`}
                            />
                        ))
                    }
                </View>
                <View>
                    <Image source={{ uri: item }} style={{ opacity: 0.5, backgroundColor: "black", marginRight: 20, marginLeft: 5, borderRadius: 25 }} className="h-64" />
                </View>
                <View style={{ position: "absolute", top: "50%", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 50, padding: 5, left: "2%", zIndex: 10 }}>
                    <Ionicons onPress={handleImagePrev} name='arrow-back' size={24} color="white" />
                </View>
            </View>
        )
    }

    const getRestaurantData = async () => {
        try {
            const restaurantQuery = query(
                collection(db, "restaurants"),
                where("name", "==", restaurant)
            );
            const restaurantSnapshot = await getDocs(restaurantQuery);

            if (restaurantSnapshot.empty) {
                console.log("No matching restaurant found");
                return;
            }

            for (const doc of restaurantSnapshot.docs) {
                const restaurantData = doc.data();
                setRestaurantData(restaurantData);

                const carouselQuery = query(
                    collection(db, "carousel"),
                    where("res_id", "==", doc.ref)
                );
                const carouselSnapshot = await getDocs(carouselQuery);
                const carouselImages = [];
                if (carouselSnapshot.empty) {
                    console.log("No matching carousel found");
                    return;
                }
                carouselSnapshot.forEach((carouselDoc) => {
                    carouselImages.push(carouselDoc.data());
                });
                setCarouselData(carouselImages);

                const slotsQuery = query(
                    collection(db, "slots"),
                    where("ref_id", "==", doc.ref)
                );
                const slotsSnapshot = await getDocs(slotsQuery);
                const slots = [];
                if (carouselSnapshot.empty) {
                    console.log("No matching slots found");
                    return;
                }
                slotsSnapshot.forEach((slotDoc) => {
                    slots.push(slotDoc.data());
                });
                setSlotsData(slots[0]?.slot);
            }
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };
    useEffect(() => {
        getRestaurantData()
    }, [])

    console.log(slotsData, "-----------------------")

    const handleLocation = async () => {
        const url = "https://maps.app.goo.gl/y2SCBrH3AzsKhoqt6"
        const supported = await Linking.canOpenURL(url)

        if (supported) {
            await Linking.openURL(url);
        }
        else {
            console.log("Cannot open URL")
        }
    }

    return (
        <SafeAreaView
            style={[
                { backgroundColor: "#2b2b2b" },
                Platform.OS === "android" && { paddingBottom: 55 },
                Platform.OS === "ios" && { paddingBottom: 20 },
            ]}>
            <ScrollView className="h-full">
                <View className="flex-1 my-2 p-2">
                    <Text className="text-xl text-[#f49b33] mr-2 font-semibold">
                        {restaurant}
                    </Text>
                    <View className="border-b border-[#f49b33]"></View>
                </View>
                <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
                    <FlatList
                        ref={FlatListRef}
                        data={carouselData[0]?.images}
                        renderItem={carouselItem}
                        horizontal
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        style={{ borderRadius: 25 }}
                    />
                </View>

                <View className="flex-1 flex-row mt-2 p-2">
                    <Ionicons onPress={handleImagePrev} name='location-sharp' size={24} color="#f49b33" />
                    <Text className="text-white max-w-[75%]">
                        {restaurantData?.address} | {" "}
                        <Text className="underline flex mt-1 items-center text-[#f49b33] italic font-semibold" onPress={handleLocation}>
                            Get Direction
                        </Text>
                    </Text>
                </View>
                <View className="flex-1 flex-row mt-2 p-3">
                    <Ionicons name='time' size={24} color="#f49b33" />
                    <Text className="text-white max-w-[75%]">
                        {`Opening: ${restaurantData?.opening}`} - {`Closing: ${restaurantData?.closing}`}
                    </Text>
                </View>
                <View className="flex-1 border m-2 p-2 border-[#f49b33] rounded-lg">
                    <View className="flex-1 flex-row m-2 p-2 rounded-lg">
                        <View className="flex-1 flex-row items-center">
                            <Ionicons name="calendar" size={20} color="#f49b33" />
                            <Text className="text-white mx-2">
                                Select booking date
                            </Text>
                        </View>
                        <DatePicker date={date} setDate={setDate} />
                    </View>
                    <View className="flex-1 flex-row bg-[#474747] m-1 p-2 rounded-lg">
                        <View className="flex-1 flex-row items-center">
                            <Ionicons name="calendar" size={20} color="#f49b33" />
                            <Text className="text-white mx-2">
                                Select number of Guests
                            </Text>
                        </View>
                        <GuestPicker selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} />
                    </View>
                </View>
                <View className="flex-1">
                    <FindSlots date={date} selectedNumber={selectedNumber} slots={slotsData} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Restaurant