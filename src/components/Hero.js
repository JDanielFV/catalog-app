"use client";

import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import Image from 'next/image';

const images = [
    "https://placehold.co/400x600/ff6b35/ffffff/png?text=Papas+Fritas",
    "https://placehold.co/400x600/f7c548/2d2a26/png?text=Chicharrones",
    "https://placehold.co/400x600/e85d2a/ffffff/png?text=Palomitas",
    "https://placehold.co/400x600/8d5524/ffffff/png?text=Cacahuates",
    "https://placehold.co/400x600/ff0000/ffffff/png?text=Gomitas",
];

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={styles.title}
                >
                    CATÁLOGO DE PRODUCTOS
                </motion.h1>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className={styles.logoContainer}
                >
                    {/* Placeholder for Logo */}
                    <div className={styles.logoPlaceholder}>LOGO</div>
                </motion.div>
            </div>

            <div className={styles.imageGrid}>
                {images.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className={styles.imageWrapper}
                    >
                        <Image
                            src={src}
                            alt={`Featured Product ${index + 1}`}
                            width={300}
                            height={450}
                            className={styles.image}
                            unoptimized // For external placeholders
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
