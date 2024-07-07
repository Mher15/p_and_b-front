import { useAppDispatch } from "../../../hooks";
import { setIsProductCreateModalOpen} from "../../../../features/modals/product-modal-slice";
import { Modal } from '../modal';
import { StoreCreateForm } from './store-create-form';

export const StoreCreateModal = () => {
    const dispatch = useAppDispatch();
    const handleClose = () => dispatch(setIsProductCreateModalOpen(false));

    return (
    <Modal 
        title={'Добавление подукта'}
        onClose={handleClose}
    >
        <StoreCreateForm />
    </Modal>
)};