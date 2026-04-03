import React, { PropsWithChildren, useMemo } from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface SegmentedCircleProps {
	remainingSets: number;
	sets: number;
	size: number;
	strokeColor: string;
}

const SegmentedCircle = ({
	sets,
	remainingSets,
	size,
	strokeColor,
	children,
}: SegmentedCircleProps & PropsWithChildren) => {
	const strokeWidth = 10;
	const radius = useMemo(() => (size - strokeWidth) / 2, [size]);
	const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
	const gap = 40;

	const dash = useMemo(
		() => circumference / sets - gap,
		[circumference, sets],
	);
	const dashoffset = useMemo(
		() => circumference / 4 - gap / 2,
		[circumference],
	);

	const dashArray = useMemo(() => {
		if (!remainingSets || sets <= 1) return [];
		const result = [];
		const setsCompleted = sets - remainingSets;
		if (remainingSets === sets) {
			result.push(dash, gap);
		} else {
			for (let i = 0; i < remainingSets - 1; i++) {
				result.push(dash, gap);
			}
			result.push(dash, (setsCompleted + 1) * gap + setsCompleted * dash);
		}
		return result;
	}, [sets, remainingSets, dash]);

	return (
		<View style={{ width: size, height: size, position: "relative" }}>
			<Svg
				height={size + strokeWidth}
				width={size + strokeWidth}
			>
				<Circle
					cx={radius + strokeWidth / 2}
					cy={radius + strokeWidth / 2}
					r={radius}
					stroke={remainingSets && sets > 1 ? strokeColor : ""}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					fill="none"
					strokeDasharray={dashArray}
					strokeDashoffset={dashoffset}
				/>
			</Svg>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					position: "absolute",
					left: 0,
					top: 0,
					width: "100%",
					height: "100%",
				}}
			>
				{children}
			</View>
		</View>
	);
};

export default SegmentedCircle;
