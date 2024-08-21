import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserProvider } from '../components/UserSelection/UserContext';
import UserSelection from "../components/UserSelection/UserSelection";
import userService from "../services/userService";

jest.mock('./userService');

jest.mock('./UserCard', () => ({ user, onSelect }) => (
    <div data-testid="user-card" onClick={() => onSelect(user)}>
        <p>{user.name}</p>
    </div>
));

const mockUser1 = { name: 'User 1' };
const mockUser2 = { name: 'User 2' };

const renderUserSelection = () => {
    return render(
        <UserProvider value={{ setUser: jest.fn() }}>
            <UserSelection />
        </UserProvider>
    );
};

test('fetches and displays users', async () => {
    userService.fetchUser1.mockResolvedValue({ data: { data: mockUser1 } });
    userService.fetchUser2.mockResolvedValue({ data: { data: mockUser2 } });

    renderUserSelection();

    await waitFor(() => {
        expect(screen.getByText(/User 1/)).toBeInTheDocument();
        expect(screen.getByText(/User 2/)).toBeInTheDocument();
    });
});

test('handles user selection', async () => {
    const setUser = jest.fn();
    userService.fetchUser1.mockResolvedValue({ data: { data: mockUser1 } });
    userService.fetchUser2.mockResolvedValue({ data: { data: mockUser2 } });

    render(
        <UserProvider value={{ setUser }}>
            <UserSelection />
        </UserProvider>
    );

    await waitFor(() => {
        const userCard = screen.getAllByTestId('user-card')[0];
        userCard.click();
    });

    expect(setUser).toHaveBeenCalledWith(mockUser1);
});

test('handles fetch error', async () => {
    userService.fetchUser1.mockRejectedValue(new Error('Failed to fetch'));
    userService.fetchUser2.mockRejectedValue(new Error('Failed to fetch'));

    renderUserSelection();

    await waitFor(() => {
        expect(screen.queryByText(/User 1/)).not.toBeInTheDocument();
        expect(screen.queryByText(/User 2/)).not.toBeInTheDocument();
    });
});
