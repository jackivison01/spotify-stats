interface LoginButtonProps {
  handleLogin: () => void;
}


export default function LogInButton({ handleLogin }: LoginButtonProps) {
  return (
    <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
      Log In
    </button>
  );
}