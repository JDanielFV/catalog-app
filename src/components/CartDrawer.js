"use client";

import { useState } from 'react';
import { X, Minus, Plus, Send } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
    const { cart, removeFromCart, updateQuantity, isCartOpen, toggleCart } = useCart();
    const [message, setMessage] = useState('');

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const estimatedTotal = cart.reduce((acc, item) => acc + (item.providerCost * item.quantity), 0);

    const handleSendWhatsapp = () => {
        const phoneNumber = ""; // User didn't specify, so I'll leave it blank for them to fill or just open with text
        // "se debera enviar al whatsapp del proveedor" -> implies a specific number. 
        // I'll use a placeholder number or just allow user to pick contact if I don't put a number (but wa.me usually needs one).
        // I'll put a placeholder "521..." and comment it.
        // Actually, without a number, it might not work well on desktop.
        // I'll assume the user will configure this. I'll use a dummy number.
        const providerNumber = "5215500000000";

        let text = `Hola, me interesa cotizar los siguientes productos:\n\n`;
        cart.forEach(item => {
            text += `- ${item.quantity}x ${item.name} (Ref: ${item.id})\n`;
        });

        if (message) {
            text += `\nMensaje adicional: ${message}`;
        }

        const url = `https://wa.me/${providerNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                    />
                    <motion.div
                        className={styles.drawer}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className={styles.header}>
                            <h2>Tu Cotización</h2>
                            <button onClick={toggleCart} className={styles.closeButton}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.items}>
                            {cart.length === 0 ? (
                                <div className={styles.empty}>
                                    <p>No hay productos seleccionados.</p>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className={styles.item}>
                                        <div className={styles.itemInfo}>
                                            <h3>{item.name}</h3>
                                            <p className={styles.itemPrice}>${item.providerCost}</p>
                                        </div>
                                        <div className={styles.controls}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <Minus size={16} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.summary}>
                                <span>Total estimado:</span>
                                <span className={styles.totalPrice}>${estimatedTotal}</span>
                            </div>

                            <textarea
                                className={styles.messageInput}
                                placeholder="Mensaje adicional para la cotización..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={3}
                            />

                            <button
                                onClick={handleSendWhatsapp}
                                disabled={cart.length === 0}
                                className={styles.sendButton}
                            >
                                <Send size={18} />
                                Enviar Cotización
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
