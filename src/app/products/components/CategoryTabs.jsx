
'use client'
// src/components/CategoryTabs.jsx
import React from 'react';

const CategoryTabs = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div className="flex gap-3 justify-start lg:justify-center mb-12 flex-wrap overflow-x-auto lg:overflow-visible pb-2 px-1">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 min-w-[120px] px-4 py-2 rounded-xl font-semibold text-sm transition duration-300 border shadow-md text-center cursor-pointer whitespace-nowrap ${
                        activeCategory === cat
                            ? `bg-primary text-white border-transparent shadow-lg shadow-purple-200 scale-105`
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                    aria-pressed={activeCategory === cat}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryTabs;