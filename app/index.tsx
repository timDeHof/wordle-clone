import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	useColorScheme,
} from "react-native";
import Icon from "../assets/images/wordle-icon.svg";
import { Link } from "expo-router";
import { format } from "date-fns";
import { Colors } from "@/constants/Colors";
import ThemedText from "../components/themedText";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import SubscribeModal from "@/components/SubscribeModal";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";

export default function Page() {
	const colorScheme = useColorScheme();
	const backgroundColor = Colors[colorScheme ?? "light"].background;
	const textColor = Colors[colorScheme ?? "light"].text;
	const subscribeModalRef = useRef<BottomSheetModal>(null);

	const handlePresentSubscribeModal = () => {
		subscribeModalRef.current?.present();
	};
	const { signOut } = useAuth();
	return (
		<View style={[styles.container, { backgroundColor }]}>
			<SubscribeModal ref={subscribeModalRef} />
			<View style={styles.header}>
				<Icon width={100} height={100} />
				<ThemedText style={styles.title}>Wordle</ThemedText>
				<ThemedText style={styles.text}>
					Get 6 chances to guess a 5-letter word.
				</ThemedText>
			</View>
			<View style={styles.menu}>
				<Link
					href='/game'
					style={[
						styles.btn,
						{ backgroundColor: colorScheme === "light" ? "#000" : "#4a4a4a" },
					]}
					asChild>
					<TouchableOpacity>
						<ThemedText style={[styles.btnText, styles.primaryText]}>
							Play
						</ThemedText>
					</TouchableOpacity>
				</Link>

				<SignedOut>
					<Link
						href='/login'
						asChild
						style={[styles.btn, { borderColor: textColor }]}>
						<TouchableOpacity>
							<ThemedText style={styles.btnText}>Log in</ThemedText>
						</TouchableOpacity>
					</Link>
				</SignedOut>
				<SignedIn>
					<TouchableOpacity
						onPress={() => signOut()}
						style={[styles.btn, { borderColor: textColor }]}>
						<ThemedText style={styles.btnText}>Sign out</ThemedText>
					</TouchableOpacity>
				</SignedIn>
				<TouchableOpacity
					onPress={handlePresentSubscribeModal}
					style={[styles.btn, { borderColor: textColor }]}>
					<ThemedText style={styles.btnText}>Subscribe</ThemedText>
				</TouchableOpacity>
			</View>
			<View style={styles.footer}>
				<ThemedText style={styles.footerDate}>
					{format(new Date(), "MMMM d, yyyy")}
				</ThemedText>
				<ThemedText style={styles.footerText}>No. 1151</ThemedText>
				<ThemedText style={styles.footerText}>Edited by Tim DeHof</ThemedText>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 50,
		gap: 40,
	},
	header: {
		alignItems: "center",
		gap: 10,
	},
	title: {
		fontSize: 40,
		fontFamily: "FrankRuhlLibre_800ExtraBold",
	},
	text: {
		fontSize: 26,
		textAlign: "center",
		fontFamily: "FrankRuhlLibre_500Medium",
	},
	menu: {
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	footer: {
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	footerText: {},
	footerDate: { fontWeight: "bold" },
	btn: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 30,
		borderColor: "#000",
		borderWidth: 1,
		width: "60%",
		maxWidth: 200,
	},
	btnText: {
		padding: 14,
		fontSize: 16,
		fontWeight: "semibold",
	},
	primaryItem: {
		backgroundColor: "#000",
	},
	primaryText: {
		color: "#fff",
	},
});
