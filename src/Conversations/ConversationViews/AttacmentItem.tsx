import React, { FC, useEffect, useState } from "react";
import { Platform, Pressable, Share, View, Image } from "react-native";
import { IAttacmentItem } from "../Interfaces/IAttacmentItem";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { IAttachmentReferenceDetails } from "../../AppState/MessagingHubState/Interfaces/IAttachmentReferenceDetails";
import Constants from "expo-constants";
import { useToast } from "native-base";
import { DocStyles } from "../../Components/InputFields/Document/DocumentStyles";
import { useReduxSelector } from "../../AppState/Store";
import { StyledFontAwasomeIcon } from "../../Components/Icons/Icons";
import { faFileWord, faFileExcel } from "@fortawesome/pro-light-svg-icons";
import { colorScheme, margins } from "../../globalStyles/constants";
import { flexBoxRow } from "../../globalStyles/flexBox";
import { StyledSmallText } from "../../Components/Typography/StyledTypography";
import { WithTopSmallMg } from "../../globalStyles";
import { ImageCachingService } from "../../CachingService.ts/ImageCachingService";

const AttacmentItem: FC<IAttacmentItem> = ({ attachment }) => {
    const [attachmentItem, updateAttachment] = useState<JSX.Element>(<View></View>);

    const { sessionid, token } = useReduxSelector((state) => state.Authentication);

    const toast = useToast();

    const filetype = attachment.title.split(".")[1];

    const getSize = () => {
        let size;
        if (attachment.size > 1024) {
            size = attachment.size / 1024;
            return `${size.toFixed(2)}MB`;
        }
        return `${attachment.size}KB`;
    };

    const fileIcon = () => {
        // console.log(filetype);

        switch (filetype) {
            case "docx":
                return (
                    <StyledFontAwasomeIcon
                        size={18}
                        color={colorScheme.defaultColors.defaultBackgroundColor}
                        icon={faFileWord}
                    />
                );
            case "doc":
                return (
                    <StyledFontAwasomeIcon
                        size={18}
                        color={colorScheme.defaultColors.defaultBackgroundColor}
                        icon={faFileWord}
                    />
                );
            case "xlsx":
                return (
                    <StyledFontAwasomeIcon
                        size={18}
                        color={colorScheme.defaultColors.defaultBackgroundColor}
                        icon={faFileExcel}
                    />
                );
        }
    };
    // console.log(attachment);

    //TODO add video, audio, think about refactoring??
    useEffect(() => {
        if (attachment.mimeType.includes("image")) {
            let image: JSX.Element | JSX.Element[];
            const headers = getHeaders();
            const inCache = ImageCachingService.inCache(attachment.downloadReference);
            if (inCache) {
                image = ImageCachingService.getImage(attachment.downloadReference);
            } else {
                const imageView = <Image source={{ uri: attachment.downloadReference, headers: headers }} style={DocStyles.img} />;
                ImageCachingService.addToCache({ key: attachment.downloadReference, value: imageView });
                image = imageView;
            };
            updateAttachment(
                <Pressable /* style={{ width: "100%" }} */ onPress={() => onPresshandler()}>
                    {image}
                </Pressable>
            );
        } else {
            updateAttachment(
                <WithTopSmallMg>
                    <Pressable onPress={() => onPresshandler()}>
                        <View style={flexBoxRow.default}>
                            <View
                                style={{
                                    marginRight: margins.smallMargin,
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <View
                                    style={{
                                        padding: margins.exSmallMargin,
                                        borderRadius: 100,
                                        backgroundColor: colorScheme.defaultColors.mainColor,
                                    }}
                                >
                                    {fileIcon()}
                                </View>
                            </View>
                            <View>
                                <View>
                                    <StyledSmallText
                                        lineHeight={14}
                                        color={colorScheme.defaultColors.defaultBackgroundColor}
                                    >
                                        {attachment.title}
                                    </StyledSmallText>
                                </View>
                                <View>
                                    <StyledSmallText
                                        lineHeight={15}
                                        color={colorScheme.buttonColors.cancelBackground}
                                        fontSize={10}
                                    >
                                        {getSize()}
                                    </StyledSmallText>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                </WithTopSmallMg>
            );
        }
    }, []);

    async function onPresshandler() {
        await download(attachment);
    }

    const download = async (attachment: IAttachmentReferenceDetails) => {
        const headers = getHeaders();
        const file = await FileSystem.downloadAsync(
            attachment.downloadReference,
            FileSystem.documentDirectory + attachment.title,
            {
                headers: headers,
            }
        );

        if (Platform.OS == "ios") {
            await Share.share(
                {
                    url: file.uri,
                },
                {}
            );
            return;
        }

        if (attachment.mimeType.includes("image") || attachment.mimeType.includes("video")) {
            //NOTE working only for  images and videos
            let premission = await MediaLibrary.getPermissionsAsync();
            if (!premission.granted) {
                await MediaLibrary.requestPermissionsAsync();
            }
            await MediaLibrary.requestPermissionsAsync();

            try {
                let asset = await MediaLibrary.createAssetAsync(file.uri);
                await MediaLibrary.createAlbumAsync(Constants.manifest.name, asset, false);
            } catch (error) { }
            toast.show({
                description: "Downloaded to folder " + Constants.manifest.name,
                placement: "top",
                status: "success",
            });
        } else {
            await Share.share(
                {
                    url: file.uri,
                },
                {}
            );
        }
    };

    return attachmentItem;

    function getHeaders() {
        return {
            "sessionid": sessionid!,
            "request-token": token!,
            "request-signature": "",
            "Accept": "*/*",
            "Content-Type": "application/json",
        };
    }
};

export default AttacmentItem;
