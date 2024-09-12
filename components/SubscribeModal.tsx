import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	useColorScheme,
	Image,
} from "react-native";
import { forwardRef, useCallback, useMemo } from "react";
import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetScrollView,
	useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { defaultStyles } from "@/constants/Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import ThemedText from "../components/themedText";
import { Colors } from "@/constants/Colors";
import disc from "@jsamr/counter-style/presets/disc";
import MarkedList from "@jsamr/react-native-li";
export type Ref = BottomSheetModal;

const BENEFITS = [
	"Enjoy full access to Wordle, Spelling Bee, The Crossword and more.",
	"Play new puzzles every day for concentration or relaxation.",
	"Strengthen your strategy with WordleBot.",
	"Unlock over 10,000 puzzles in our Wordle, Spelling Bee and crossword archives.",
	"Track your stats and streaks on any device.",
];

const SubscribeModal = forwardRef<Ref>((props, ref) => {
	const colorScheme = useColorScheme();
	const backgroundColor = Colors[colorScheme ?? "light"].background;
	const snapPoints = useMemo(() => ["90%"], []);
	const { dismiss } = useBottomSheetModal();
	const { bottom } = useSafeAreaInsets();

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				opacity={0.8}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				{...props}
				onPress={dismiss}
			/>
		),
		[],
	);
	return (
		<BottomSheetModal
			snapPoints={snapPoints}
			backdropComponent={renderBackdrop}
			handleComponent={null}
			ref={ref}
			index={0}>
			<View style={[styles.contentContainer]}>
				<View style={styles.modalBtns}>
					<Link href='/login ' asChild>
						<TouchableOpacity>
							<ThemedText style={styles.btnText}>Log in</ThemedText>
						</TouchableOpacity>
					</Link>
					<TouchableOpacity onPress={() => dismiss()}>
						<Ionicons
							name='close'
							size={28}
							color={Colors[colorScheme ?? "light"].gray}
						/>
					</TouchableOpacity>
				</View>
				<BottomSheetScrollView>
					<Text style={styles.containerHeadline}>
						Unlimited Play.{"\n"} Try free for 7 days.
					</Text>
					<Image
						source={require("@/assets/images/games.png")}
						style={styles.image}
					/>
					<View style={{ marginVertical: 20 }}>
						<MarkedList
							counterRenderer={disc}
							lineStyle={{
								paddingHorizontal: 40,
								gap: 10,
								marginVertical: 10,
							}}>
							{BENEFITS.map((benefit, index) => (
								<Text key={index} style={styles.listText}>
									{benefit}
								</Text>
							))}
						</MarkedList>
					</View>
					<Text style={styles.disclaimer}>
						If you subscribe to The New York Times via this app, payment for
						your subscription will be automatically charged to your Apple ID
						account upon your confirmation of purchase with Apple. Your Apple ID
						account will be automatically charged for renewal at the applicable
						rate shown to you at the time of subscription every calendar month
						(for monthly subscriptions) or every year (for annual subscriptions)
						within 24-hours prior to the start of your next billing period. For
						special introductory offers, you will be automatically charged the
						applicable introductory rate shown to you at the time of
						subscription for the stated introductory period and the standard
						rate rate shown to you at the time of subscription thereafter. You
						will be charged in advance. Subscriptions continue automatically
						until you cancel. Cancellation takes effect at the end of your
						current billing period. You can manage and cancel subscriptions in
						your account settings on the App Store. To cancel, please turn off
						auto-renew at lead; 24-hours before the end of your current billing
						period from your iTunes account settings.
					</Text>
				</BottomSheetScrollView>
				<View style={[styles.footer, { paddingBottom: bottom }]}>
					<TouchableOpacity style={defaultStyles.btn}>
						<Text style={defaultStyles.btnText}>Try 7 days free</Text>
					</TouchableOpacity>
					<Text style={styles.footerText}>
						2,99 €/month after 7-day trial. Cancel anytime.
					</Text>
				</View>
			</View>
		</BottomSheetModal>
	);
});

export default SubscribeModal;

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#fff",
	},
	containerHeadline: {
		fontSize: 34,
		padding: 20,
		textAlign: "center",
		fontFamily: "FrankRuhlLibre_900Black",
	},

	modalBtns: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	btnText: {
		fontSize: 14,
		fontWeight: "bold",
	},
	image: {
		width: "90%",
		alignSelf: "center",
		height: 40,
	},
	listText: {
		fontSize: 14,
		flexShrink: 1,
		color: "#4f4f4f",
	},
	disclaimer: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#484848",
		marginHorizontal: 30,
		lineHeight: 18,
		marginBottom: 20,
	},
	footer: {
		backgroundColor: "#fff",
		marginTop: "auto",
		paddingHorizontal: 20,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 5,
		paddingTop: 20,
	},
	footerText: {
		textAlign: "center",
		fontSize: 14,
		color: "#484848",
		paddingTop: 10,
	},
});
