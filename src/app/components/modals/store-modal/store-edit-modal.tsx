import { useAppDispatch } from "../../../hooks";
import { setIsProductEditModalOpen } from "../../../../features/modals/product-modal-slice";
import { Modal } from '../modal';
import { ProductEditForm } from './store-edit-form';

export const ProductEditModal = () => {
    const dispatch = useAppDispatch();
    const handleClose = () => dispatch(setIsProductEditModalOpen({isOpen: false}));

    return (
    <Modal 
        title={'Редактирование товара'}
        onClose={handleClose}
    >
        <ProductEditForm />
    </Modal>
)};