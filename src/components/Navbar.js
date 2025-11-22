"use client";

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';
import { motion } from 'framer-motion';

export default function Navbar() {
    const { cart, toggleCart } = useCart();
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <motion.nav
            className={styles.navbar}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    CATÁLOGO
                </Link>
                <button onClick={toggleCart} className={styles.cartButton}>
                    <ShoppingBag size={24} />
                    {totalItems > 0 && (
                        <span className={styles.badge}>{totalItems}</span>
                    )}
                </button>
            </div>
        </motion.nav>
    );
}
