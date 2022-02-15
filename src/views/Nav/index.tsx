import logo from '@/assets/logo.svg'
import menu from '@/assets/menu.svg'
import menu1 from '@/assets/menu1.svg'
import Search from '@/components/Search'
import ROUTES from '@/config/routes'
import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import style from './index.module.scss'

const Nav: React.FC = () => {
  const { pathname } = useLocation()
  const [isShow, setIsShow] = useState(false)
  const menuData = useMemo(
    () => [
      { name: 'Home', to: ROUTES.HOME },
      { name: 'Block', to: ROUTES.BLOCK },
      { name: 'Transaction', to: ROUTES.TRANSACTION },
      { name: 'Validator', to: ROUTES.VALIDATOR },
      { name: 'Token Transfers', to: ROUTES.TOKENTRANSFERS },
      { name: 'Bridge', to: ROUTES.BRIDGE }
    ],
    []
  )
  const showMenu = () => {
    setIsShow(!isShow)
  }

  return (
    <div className={style['menu-wrap']}>
      <div className={style['menu']}>
        <div>
          <NavLink to={ROUTES.HOME}>
            <img src={logo} className={style.logo} alt="" />
            <span>DcfsScan</span>
          </NavLink>
        </div>
        {pathname === '/' ? (
          ''
        ) : (
          <div style={{ width: '35%' }}>
            <Search size={'middle'} />
          </div>
        )}
        <div>
          <nav>
            {menuData.map(({ name, to }) => (
              <NavLink key={to} to={to} activeStyle={{ fontWeight: 'bold', color: '#00C299', borderBottom: '3px solid #00C299', padding: ' 20px 0' }} exact>
                {name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <div className={style.menu_m}>
        <NavLink to={ROUTES.HOME}>
          <img src={logo} className={style.logo} alt="" />
          <span>DcfsScan</span>
        </NavLink>
        {isShow ? <img src={menu} onClick={showMenu} alt="" /> : <img src={menu1} onClick={showMenu} alt="" />}
      </div>
      {isShow ? (
        <div className={style.menu_list}>
          <nav>
            {menuData.map(({ name, to }) => (
              <NavLink
                onClick={showMenu}
                key={to}
                to={to}
                activeStyle={{ fontWeight: 'bold', color: '#00C299', padding: '10px 18px', backgroundColor: '#F5F6FA' }}
                exact>
                {name}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  )
}

export default Nav
