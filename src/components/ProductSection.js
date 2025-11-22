"use client";

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductSection.module.css';
import data from '@/data/db.json';

export default function ProductSection() {
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [{ id: 'all', name: 'Todos' }, ...data.categories];

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'all') return data.products;
        return data.products.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    // Group by category if "all" is selected, or just show list
    // Actually, user requested "tarjetas de productos separadas por categorias"
    // So if "all" is selected, we should probably show sections for each category.
    // If a specific category is selected, show only that one.

    const productsByCategory = useMemo(() => {
        if (activeCategory !== 'all') {
            return { [activeCategory]: filteredProducts };
        }
        // Group all products by category
        return data.products.reduce((acc, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
        }, {});
    }, [activeCategory, filteredProducts]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.tabs}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.name === 'Todos' ? 'all' : cat.name)}
                            className={`${styles.tab} ${activeCategory === (cat.name === 'Todos' ? 'all' : cat.name) ? styles.activeTab : ''}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className={styles.grid}>
                    {Object.entries(productsByCategory).map(([category, products]) => (
                        <div key={category} className={styles.categoryGroup}>
                            <h2 className={styles.categoryTitle}>{category}</h2>
                            <div className={styles.productsRow}>
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
