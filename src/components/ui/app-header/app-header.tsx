import React, { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
	const location = useLocation();
	const isActiveConstructorPage = location.pathname === '/';
	const isActiveFeedPage = location.pathname === '/feed';
	const isActiveProfilePage = location.pathname === '/profile';

	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							`${styles.link} ${isActive ? styles.link_active : ''}`
						}
						end>
						{({ isActive }) => (
							<>
								<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
								<p
									className='text text_type_main-default ml-2 mr-10'
									data-cy='mainpage-link'>
									Конструктор
								</p>
							</>
						)}
					</NavLink>

					<NavLink
						to='/feed'
						className={({ isActive }) =>
							`${styles.link} ${isActive ? styles.link_active : ''}`
						}
						end>
						{({ isActive }) => (
							<>
								<ListIcon type={isActive ? 'primary' : 'secondary'} />
								<p className='text text_type_main-default ml-2'>
									Лента заказов
								</p>
							</>
						)}
					</NavLink>
				</div>

				<Link to={'/'} className={styles.logo}>
					<Logo className='' />
				</Link>

				<NavLink
					to='/profile'
					className={({ isActive }) =>
						`${styles.link} ${isActive ? styles.link_active : ''}`
					}
					end>
					{({ isActive }) => (
						<>
							<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
							<p className='text text_type_main-default ml-2' data-cy='user'>
								{userName || 'Личный кабинет'}
							</p>
						</>
					)}
				</NavLink>
			</nav>
		</header>
	);
};
