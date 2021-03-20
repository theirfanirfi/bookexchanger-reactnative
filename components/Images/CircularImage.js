import React from 'react';
import { Image } from 'react-native'

export default function CircularImage({ image, style, size }) {
    const getSize = (style, size) => {
        if (style == null) {
            let sizeProperty = 40;
            if (size == "xsmall") {
                sizeProperty = 30;
                return { width: sizeProperty, height: sizeProperty, borderWidth: 1, borderRadius: sizeProperty, marginLeft: 8 }
            }
            else if (size == "small") {
                sizeProperty = 40;
                return { width: sizeProperty, height: sizeProperty, borderWidth: 1, borderRadius: sizeProperty, marginLeft: 8 }
            }
            else if (size == "medium") {
                sizeProperty = 60;
                return { width: sizeProperty, height: sizeProperty, borderWidth: 1, borderRadius: sizeProperty, marginLeft: 8 }
            } else if (size == "large") {
                sizeProperty = 80;
                return { width: sizeProperty, height: sizeProperty, borderWidth: 1, borderRadius: sizeProperty, marginLeft: 8 }
            }
        } else {
            return style;
        }
    }
    return (
        <Image source={image} style={getSize(style, size)} />
    )
}