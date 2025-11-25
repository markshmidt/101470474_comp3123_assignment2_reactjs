import { Container, Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        {children}
      </Box>
    </Container>
  );
}
