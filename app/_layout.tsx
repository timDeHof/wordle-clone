import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { TouchableOpacity, useColorScheme } from "react-native";
import Logo from "@/assets/images/nyt-logo.svg";
import { Ionicons } from "@expo/vector-icons";
import {
	ThemeProvider,
	DarkTheme,
	DefaultTheme,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import {
	useFonts,
	FrankRuhlLibre_800ExtraBold,
	FrankRuhlLibre_500Medium,
	FrankRuhlLibre_900Black,
} from "@expo-google-fonts/frank-ruhl-libre";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { tokenCache } from "@/utils/cache";
import { Colors } from "react-native/Libraries/NewAppScreen";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
	throw new Error(
		"Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
	);
}

export default function RootLayout() {
	const router = useRouter();
	const colorScheme = useColorScheme();
	let [fontsLoaded] = useFonts({
		FrankRuhlLibre_800ExtraBold,
		FrankRuhlLibre_500Medium,
		FrankRuhlLibre_900Black,
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
			<ClerkLoaded>
				<ThemeProvider
					value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<BottomSheetModalProvider>
							<Stack>
								<Stack.Screen name='index' options={{ headerShown: false }} />
								<Stack.Screen
									name='login'
									options={{
										presentation: "modal",
										headerShadowVisible: false,
										headerTitle: () => <Logo width={150} height={40} />,
										headerLeft: () => (
											<TouchableOpacity onPress={() => router.back()}>
												<Ionicons
													name='close'
													size={28}
													color={Colors[colorScheme ?? "light"].gray}
												/>
											</TouchableOpacity>
										),
									}}
								/>
							</Stack>
						</BottomSheetModalProvider>
					</GestureHandlerRootView>
				</ThemeProvider>
			</ClerkLoaded>
		</ClerkProvider>
	);
}
