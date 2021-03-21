import React from 'react';
import { Image } from 'react-native'
const profile_default_image = require('../../assets/images/default.png');

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

    const getImage = (img) => {
        if (img == null) {
            return profile_default_image;
        } else {
            return { "uri": img }
        }
    }
    return (
        <Image source={getImage(image)} style={getSize(style, size)} />
    )
}