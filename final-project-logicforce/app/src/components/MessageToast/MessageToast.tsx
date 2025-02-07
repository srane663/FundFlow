import styles from './MessageToast.module.scss';

interface MessageToastProps {
  displayMessage: string;
}

const MessageToast: React.FC<MessageToastProps> = ({ displayMessage }) => {
  const toggleDetailModal = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.closest('#toast-message-modal')?.setAttribute('style', 'visibility: hidden');
  };

  // Returns the message to be displayed inside the MessageToast component
  return (
    <div className={styles.modal} id='toast-message-modal'>
      <div className={styles.modalContent} id="toast-content">
        <span className={styles.closeButton} id="close-toast" onClick={toggleDetailModal}>
          &times;
        </span>
        <h5 className={styles.container}>{displayMessage}</h5>
      </div>
    </div>
  );
};

export default MessageToast;