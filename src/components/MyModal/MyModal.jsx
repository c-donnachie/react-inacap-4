import * as React from 'react'
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";


export const MyModal = ({ content, isOpen, onOpenChange }) => {

    return (
        <>
            <Modal
                placement="top"
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    <>
                        <ModalBody>
                            {content}
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>


        </>
    )
}