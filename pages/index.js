import {AppBar, Container, Toolbar, Typography, Grid, IconButton} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
const Index = () => (
  <>
    <Container
      maxWidth={"lg"}
    >
      <AppBar
        position={"static"}
      >
        <Toolbar>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"nowrap"}
          >
            <Grid item>
              <Typography
                sx={{
                  fontSize: "1.4rem"
                }}
              >Ely</Typography>
            </Grid>
            <Grid
              item
            >
              <a target={"_blank"} href={"https://twitter.com/ratkingnft/"}>
                <IconButton
                  sx={{
                    color: "#FFFFFF"
                  }}
                >
                  <TwitterIcon />
                </IconButton>
              </a>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        container
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Grid
          item
          sx={{
            pt: 5,
            pb: 5,
            textAlign: "center"
          }}
        >
          <img
            alt={"Ely Official Music"} src={require("../images/ely_hires.jpeg")}
            style={{
              width: "80%",
              maxWidth: "1024px",
              height: "auto"
            }}
          />
        </Grid>
        <Grid item>
          <Typography
            sx={{
              fontWeight: 100,
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            Site coming soon.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </>
  
)
export default Index;
