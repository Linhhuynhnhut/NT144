import { BlurView } from "expo-blur";
import React from "react";
import {
	View,
	ImageBackground,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
const RecipeCardInfo = ({ item }) => {
	return (
		<View
			style={{
				position: "absolute",
				bottom: 20,
				left: 10,
				right: 10,
				borderWidth: 2,
				height: 100,
				borderRadius: SIZES.radius,
				borderColor: "transparent",
				paddingVertical: SIZES.radius,
				paddingHorizontal: SIZES.radius,
				backgroundColor: COLORS.transparentGray,
			}}
		>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Text
					style={{
						color: COLORS.white,
						...FONTS.h4,
						flex: 1,
						width: "70%",
					}}
				>
					{item.name}
				</Text>
				<Image
					source={
						item.isBookmark ? icons.bookmarkFilled : icons.bookmark
					}
					style={{ tintColor: COLORS.lime, height: 20, width: 20 }}
				/>
			</View>
			<Text
				style={{
					color: COLORS.lightGray,
					...FONTS.body5,
					width: "70%",
				}}
			>{`${item.duration} | ${item.serving} Serving`}</Text>
		</View>
	);
};

const TrendingCard = ({ data, onPress }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.2}
			style={{
				height: 350,
				width: 250,
				marginRight: 20,
				borderRadius: 20,
			}}
			onPress={onPress}
		>
			<Image
				source={data.image}
				style={{ height: 350, width: 250, borderRadius: 20 }}
				resizeMode="cover"
			/>
			<View
				style={{
					position: "absolute",
					top: 20,
					left: 15,
					paddingHorizontal: 10,
					paddingVertical: 5,
					backgroundColor: "rgba(242, 242, 242, 0.4)",
					borderRadius: SIZES.radius,
				}}
			>
				<Text style={{ ...FONTS.body5, color: COLORS.white }}>
					{data.category}
				</Text>
			</View>
			{/* Detail */}
			<RecipeCardInfo item={data} />
		</TouchableOpacity>
	);
};
export default TrendingCard;
