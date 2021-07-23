import React, { Fragment } from 'react';

import useWindowSize from '../../home/useWindowSize/useWindowSize';
import { useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Confetti from 'react-confetti';


const RewardNotification = (props) => {
    const { recompensas, borrarRecompensas } = props;

    const {
        // isOpen,
        // onOpen,
        onClose
    } = useDisclosure()

    const { width, height } = useWindowSize()
    
    return (
        <>
            {recompensas !== null && recompensas
            ?
                <Fragment>
                        <Confetti
                            style={{ zIndex: "99999" }}
                            width={width}
                            height={height}
                        />
                        <Modal className="reward-modal"  closeOnOverlayClick={false} isOpen={recompensas !== null ? true : false} onClose={() => {onClose(); borrarRecompensas();}} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader> ¡Felicidades por tu Logro! </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                { recompensas !== null 
                                ?
                                    <>
                                    {recompensas.msg} <b> {recompensas.firePoints} Fire Points</b>.
                                    </>
                                : null
                                }
                            </ModalBody>

                            <ModalFooter>
                                <Button onClick={() => {onClose(); borrarRecompensas();}} colorScheme="blue" mr={3}>
                                    Ok
                                </Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                </Fragment>
            : null
            }
        </>
    )
}

export default RewardNotification;