class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                :host([open="true"]) #backdrop,
                :host([open="true"]) #modal {
                    visibility: visible;
                    opacity: 1;
                }
                :host([open="true"]) #modal {
                    top: 15vh;
                }

                #backdrop {
                    position: fixed;
                    top: 0;
                    height: 100vh;
                    left: 0;
                    width: 100%;
                    background: rgba(0,0,0,0.7);
                    z-index: 9999;
                    visibility: hidden;
                    opacity: 0;
                    transition: all 0.2s ease-out;
                }

                #modal {
                    position: fixed;
                    top: 10vh;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 50%;
                    z-index: 9999;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    visibility: hidden;
                    opacity: 0;
                    transition: all 0.2s ease-out;
                }

                header {
                    padding: 15px;
                    border-bottom: 1px solid #e5e5e5;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                ::slotted([slot="heading"]) {
                    font-size: 20px;
                    margin: 0;
                }

                .close {
                    font-size: 24px;
                    cursor: pointer;
                }

                .body {
                    padding: 15px;
                }

                .actions {
                    padding: 15px;
                    text-align: right;
                    border-top: 1px solid #e5e5e5;
                }

                .actions button {
                    padding: 6px 12px;
                    font-size: 14px;
                    line-height: 1.42857143;
                    border-radius: 4px;
                    border: 0;
                    background: transparent;
                    border: 1px solid #ccc;
                    margin-left: 10px;
                }
                .actions button:hover {
                    background: #ccc
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="heading" class="heading"></slot>
                    <span class="close">&times;</span>
                </header>
                <section class="body">
                    <slot>There goes the content!
                </section>
                <slot name="actions">
                    <section class="actions">
                        <button type="cancel">Cancel</button>
                        <button type="confirm">Confirm</button>
                    </section>
                </slot>
            </div>
        `;
        this.shadowRoot.querySelector('.close').addEventListener('click', this._cancel);
        this.shadowRoot.querySelector('#backdrop').addEventListener('click', this._cancel);
        this.shadowRoot.querySelector('[type="cancel"]').addEventListener('click', this._cancel);
        this.shadowRoot.querySelector('[type="confirm"]').addEventListener('click', this._confirm);
    }

    open () {
        this.setAttribute('open', true);
    }

    close = () => {
        this.removeAttribute('open');
    }

    _confirm = () => {
        const confirmEvent = new Event('confirm');
        this.dispatchEvent(confirmEvent);
        this.close();
    }

    _cancel = () => {
        const cancelEvent = new Event('cancel');
        this.dispatchEvent(cancelEvent);
        this.close();
    }
}

customElements.define('my-modal', Modal);