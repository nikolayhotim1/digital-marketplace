'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import useOnClickOutside from '@/hooks/use-on-click-outside'
import { useEffect, useRef, useState } from 'react'
import NavItem from './nav-item'

export default function NavItems() {
	const [activeIndex, setActiveIndex] = useState<null | number>(null)
	const isAnyOpen = activeIndex !== null
	const navRef = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setActiveIndex(null)
		}
		document.addEventListener('keydown', handler)
		return () => {
			document.removeEventListener('keydown', handler)
		}
	}, [])
	useOnClickOutside(navRef, () => setActiveIndex(null))
	return (
		<div className='flex gap-4 h-full' ref={navRef}>
			{PRODUCT_CATEGORIES.map((category, i) => {
				const isOpen = i === activeIndex
				function handleOpen() {
					if (activeIndex === i) setActiveIndex(null)
					else setActiveIndex(i)
				}
				function handleClose() {
					return setActiveIndex(null)
				}
				return (
					<NavItem
						key={category.value}
						category={category}
						isOpen={isOpen}
						isAnyOpen={isAnyOpen}
						onOpen={handleOpen}
						onClose={handleClose}
					/>
				)
			})}
		</div>
	)
}
