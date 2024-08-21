import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../components/UserSelection/UserContext';
import Header from "../components/Header/Header";

const mockLogout = jest.fn();
const mockNavigate = jest.fn();

const renderHeaderWithUser = (user) => {
    return render(
        <Router>
            <UserProvider value={{ user, logout: mockLogout }}>
                <Header />
            </UserProvider>
        </Router>
    );
};

afterEach(() => {
    jest.clearAllMocks();
});

test('renders user name and profile picture when user is present', () => {
    const mockUser = {
        name: 'John Smith',
        profile_picture_url: 'https://placehold.co/600x400.png',
        current_organisation: { name: 'Sample Bank ABC' }
    };

    renderHeaderWithUser(mockUser);

    expect(screen.getByText(/John Smith/)).toBeInTheDocument();

    expect(screen.getByAltText('User Avatar')).toHaveAttribute('src', mockUser.profile_picture_url);
});

test('displays default avatar and user name when profile picture is not present', () => {
    const mockUser = {
        name: 'John Smith',
        profile_picture_url: null,
        current_organisation: { name: 'Sample Bank ABC' }
    };

    renderHeaderWithUser(mockUser);

    expect(screen.getByText(/John Smith/)).toBeInTheDocument();

    expect(screen.getByAltText('User Avatar')).toHaveClass('bg-[#67e121]');
});

test('opens and closes the popup on button click', () => {
    const mockUser = { name: 'John Smith', profile_picture_url: null };

    renderHeaderWithUser(mockUser);

    expect(screen.queryByText(/Log out/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/Log out/)).toBeInTheDocument();

    fireEvent.click(document);

    expect(screen.queryByText(/Log out/)).not.toBeInTheDocument();
});

test('calls logout and navigates to home when clicking on logout button', () => {
    const mockUser = { name: 'John Smith', profile_picture_url: null };

    renderHeaderWithUser(mockUser);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText(/Log out/));

    expect(mockLogout).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith('/');
});
