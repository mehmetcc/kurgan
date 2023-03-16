import * as React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

type Props = {
    errorMessage: string | null;
}

const LocationErrorModal: React.FC<Props> = ({ errorMessage }: Props) => {
    const check = (str: string | null) => {
        return str == null;
    };

    return (
        <SafeAreaView>
            <Modal isVisible={check(errorMessage)}>
                <Text>{errorMessage}</Text>
            </Modal>
        </SafeAreaView>
    );
};

export default LocationErrorModal;