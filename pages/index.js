import { Container, Typography, Grid } from "@mui/material";
import AppHeader from "../components/AppHeader";
import MintCart from "../components/MintCart";
import SongsSection from "../components/SongsSection";

const Index = () => {
  
  return(
    <>
      <AppHeader/>
      <Container
        maxWidth={"lg"}
      >
        <Grid
          container
          flexDirection={"column"}
          alignItems={"center"}
          sx={{
            pb: 10
          }}
        >
          <Grid
            item
            container
            sx={{
              pt: 5,
              pb: 5,
              textAlign: "center"
            }}
            
          >
            <MintCart/>
          </Grid>
          <Grid
            item
            sx={{
              maxWidth: {
                xs: "100%",
                md: "none"
              },
              overflow: {
                xs: "hidden",
                md: "visible"
              }
            }}
          >
            {/*<Typography*/}
            {/*  sx={{*/}
            {/*    fontWeight: 100,*/}
            {/*    fontSize: "1.5rem",*/}
            {/*    textAlign: "center",*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Site coming soon.*/}
            {/*</Typography>*/}
            <SongsSection/>
          </Grid>
        </Grid>
      </Container>
    </>
  )
  
}

export default Index;
