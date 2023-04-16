import styled from "@emotion/styled";

const Container = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 6rem;
	min-height: 100vh;
`;

export default function Home() {
	return <Container>This is the index page</Container>;
}
