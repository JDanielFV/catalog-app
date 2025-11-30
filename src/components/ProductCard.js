"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
    return (
        <motion.div
            className={styles.card}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <div className={styles.imageContainer}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 50vw, 20vw"
                />
            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.details}>
                    <span className={styles.grammage}>{product.grammage}</span>
                    <span className={styles.price}>${product.providerCost}</span>
                </div>
            </div>
        </motion.div>
    );
}
