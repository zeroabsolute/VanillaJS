const appContainer = document.getElementById('container');

const modalTriggerBtn = document.getElementById('modal-trigger-btn');

const modalHeaderContent = document.createElement('div');
modalHeaderContent.textContent = 'This is the modal header';
modalHeaderContent.className = 'modal-header';
const modalBodyContent = document.createElement('div');
modalBodyContent.textContent = 'This is the modal body';
modalBodyContent.className = 'modal-body';
const modalFooterContent = document.createElement('div');
modalFooterContent.textContent = 'This is the modal footer';
modalFooterContent.className = 'modal-footer';

modalTriggerBtn.addEventListener('click', () => {
  onModalOpen(
    modalHeaderContent,
    modalBodyContent,
    modalFooterContent,
  );
});

function onModalOpen(header, body, footer) {
  createModalLayout(appContainer, header, body, footer);
}

function onModalClose(modal) {
  modal.remove();
}

function createModalLayout(parent, header, body, footer) {
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'modal-backdrop';

  const modalBox = document.createElement('div');
  modalBox.className = 'modal-box';

  const modalCloseBtn = document.createElement('span');
  modalCloseBtn.innerHTML = '&times;';
  modalCloseBtn.className = 'modal-close-btn';
  modalCloseBtn.addEventListener('click', () => onModalClose(modalBackdrop));

  modalBackdrop.appendChild(modalBox);
  modalBox.appendChild(modalCloseBtn);
  modalBox.appendChild(header);
  modalBox.appendChild(body);
  modalBox.appendChild(footer);
  parent.appendChild(modalBackdrop);
}