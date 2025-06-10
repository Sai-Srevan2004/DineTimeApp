import { Image, ScrollView, Text, TouchableOpacity, View, StatusBar, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from '../../assets/images/dinetimelogo.png';
import frame from '../../assets/images/Frame.png';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import validationSchema from "../../utils/authSchema"

const Signup = () => {
    const router = useRouter();

    const handleSignup = (values) => {
        // Handle signup logic
        console.log(values);
        // router.push('/somewhere');
    };

    return (
        <SafeAreaView className={`bg-[#2b2b2b]`}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#2b2b2b"} />
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="m-2 flex justify-center items-center">
                    <Image source={logo} style={{ width: 200, height: 150 }} />
                    <Text className="text-lg text-center text-white font-bold mb-10">
                        Let&apos;s get you started
                    </Text>

                    <View className="w-5/6">
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={validationSchema}
                            onSubmit={handleSignup}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

                                <View className="w-full">
                                    <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                                    <TextInput
                                        onChangeText={handleChange("email")}
                                        value={values.email}
                                        keyboardType="email-address"
                                        onBlur={handleBlur("email")}
                                        className="h-12 border border-white text-white rounded px-2"
                                    />
                                    {touched.email && errors.email && <Text className="text-red-500 text-xs mb-2">{errors.email}</Text>}


                                    <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                                    <TextInput
                                        onChangeText={handleChange("password")}
                                        value={values.password}
                                        secureTextEntry
                                        onBlur={handleBlur("password")}
                                        className="h-12 border border-white text-white rounded px-2"
                                    />
                                    {touched.password && errors.password && <Text className="text-red-500 text-xs mb-2">{errors.password}</Text>}
                                    <TouchableOpacity
                                        style={{ padding: 9, backgroundColor: '#f49b33', borderRadius: 8, marginTop: 19 }}
                                        onPress={handleSubmit}
                                    >
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity>


                                </View>
                            )}
                        </Formik>
                        <View>
                            <TouchableOpacity className="flex flex-row items-center justify-center mt-4" onPress={() => router.push("/signin")}>
                                <Text className="text-semibold text-white">
                                    Already a User? {" "}
                                </Text>
                                <Text className="text-base font-semibold underline text-[#f49b33]">
                                    SignIn
                                </Text>
                            </TouchableOpacity>

                            <Text className="text-center text-base font-semibold my-4 text-white">
                                <View className="border-b-2 border-[#f49b33] p-2 mb-1 w-24" /> or{" "}
                                <View className="border-b-2 border-[#f49b33]  p-2 mb-1 w-24" />
                            </Text>

                            <TouchableOpacity className="flex flex-row items-center justify-center" onPress={() => router.push("/home")}>
                                <Text className="text-semibold text-white">
                                    Be a{" "}
                                </Text>
                                <Text className="text-base font-semibold underline text-[#f49b33]">
                                  Guest User
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="flex-1">
                    <Image source={frame} className="w-full h-full" resizeMode="contain" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Signup;
