"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Facebook, Instagram, Phone, X } from 'lucide-react';
import styles from './ContactMenu.module.css';

const WhatsAppIcon = ({ className }) => (
    <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width="28"
        height="28"
    >
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
    </svg>
);

export default function ContactMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showFab, setShowFab] = useState(false);

    useEffect(() => {
        // Show FAB after 3 seconds
        const fabTimer = setTimeout(() => {
            setShowFab(true);
        }, 3000);

        return () => clearTimeout(fabTimer);
    }, []);

    useEffect(() => {
        let timer;

        const startTimer = () => {
            if (hasInteracted || isOpen) return;

            clearTimeout(timer);
            timer = setTimeout(() => {
                setIsOpen(true);
            }, 10000);
        };

        const handleActivity = () => {
            if (hasInteracted || isOpen) return;
            startTimer();
        };

        // Initial timer
        startTimer();

        // Listen for user activity
        window.addEventListener('scroll', handleActivity);
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('click', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('touchstart', handleActivity);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleActivity);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('click', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('touchstart', handleActivity);
        };
    }, [hasInteracted, isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setHasInteracted(true);
    };

    const handleAction = (url) => {
        window.open(url, '_blank');
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <div className={styles.container}>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className={styles.card}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <h3 className={styles.title}>¿Necesitas ayuda?</h3>
                            <p className={styles.description}>
                                Contáctanos por cualquiera de nuestros medios oficiales.
                            </p>

                            <div className={styles.grid}>
                                <button
                                    className={`${styles.socialButton} ${styles.whatsapp}`}
                                    onClick={() => handleAction('https://wa.me/526861087987')}
                                >
                                    <WhatsAppIcon className={styles.icon} />
                                    <span>WhatsApp</span>
                                </button>

                                <button
                                    className={`${styles.socialButton} ${styles.facebook}`}
                                    onClick={() => handleAction('https://www.facebook.com/share/17kpS76mHR/?mibextid=wwXIfr')}
                                >
                                    <Facebook size={24} />
                                    <span>Facebook</span>
                                </button>

                                <button
                                    className={`${styles.socialButton} ${styles.instagram}`}
                                    onClick={() => handleAction('https://instagram.com')}
                                >
                                    <Instagram size={24} />
                                    <span>Instagram</span>
                                </button>

                                <button
                                    className={`${styles.socialButton} ${styles.phone}`}
                                    onClick={() => handleAction('tel:+526861087987')}
                                >
                                    <Phone size={24} />
                                    <span>Llamar</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showFab && (
                        <motion.button
                            className={styles.fab}
                            onClick={toggleMenu}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isOpen ? (
                                <>
                                    <X size={20} />
                                    <span>Cerrar</span>
                                </>
                            ) : (
                                <>
                                    <MessageCircle size={20} />
                                    <span>Contáctanos</span>
                                </>
                            )}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
