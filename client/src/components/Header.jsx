import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user)
    const theme = useSelector(state => state.theme.theme)

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });

            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Navbar className='border-b-2 font-display bg-white border-gray-200 dark:bg-[#151515]'>
            <Link to='/' className='self-center whitespace-nowrap 
            text-sm sm:text-xl 
            font-semibold'>
                <span className={`px-2 py-1 bg-gradient-to-r ${theme === 'dark' ? 'from-emerald-400 to-cyan-400' : 'from-emerald-500 to-emerald-900'} bg-clip-text text-transparent`}>
                    daily struggle.
                </span>
            </Link>

            {/* <form>
                <TextInput type='text'
                    placeholder='Search'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline' />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button> */}

            <div className="flex gap-2 md:order-2">
                <Button className='w-12 h-10 sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </Button>
                {currentUser ? (
                    <Dropdown arrowIcon={false}
                        inline
                        label={
                            <Avatar alt='user' img={currentUser?.profilePicture} rounded />
                        }>
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser?.username}</span>

                            <span className='block text-sm font-medium truncate'>{currentUser?.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />

                        <Dropdown.Item onClick={handleSignout}>
                            Sign Out
                        </Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to='/signin'>
                        <Button gradientDuoTone="greenToBlue" outline>Sign in
                        </Button>
                    </Link>
                )
                }

                <Navbar.Toggle />
            </div >
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>

                {/* <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link> */}

                <Navbar.Link active={path === '/chapters'} as={'div'}>
                    <Link to='/chapters'>Chapters</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar >
    )
}
