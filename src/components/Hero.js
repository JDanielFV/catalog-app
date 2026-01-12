"use client";

import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import Image from 'next/image';

const images = [
    "/p_3.png",
    "/p_4.png",
    "/p_5.png",
    "/p_15.png",
    "/p_11.png",
];

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className={styles.logoContainer}
                >
                    {/* Logo Image */}
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/Recurso 1.png"
                            alt="Logo"
                            fill
                            className={styles.logoImage}
                            priority
                        />
                    </div>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={styles.title}
                >
                    CATÁLOGO DE PRODUCTOS
                </motion.h1>
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
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={index < 2}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
