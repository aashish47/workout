import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface SegmentedCircleProps {
    remainingSets: number;
    sets: number;
    size: number;
    strokeColor: string;
}

const SegmentedCircle = ({ sets, remainingSets, size, strokeColor, children }: SegmentedCircleProps & PropsWithChildren) => {
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const gap = 40;
    const dash = circumference / sets - gap;
    const dashoffset = circumference / 4 - gap / 2;

    const generateDashArray = (remainingSets: number) => {
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
    };
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
                    strokeDasharray={generateDashArray(remainingSets)}
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
