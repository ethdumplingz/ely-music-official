import {AppBar, Container, Toolbar, Typography, Grid, IconButton, Button} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import {useTheme} from "@mui/material/styles"
import AppHeader from "../components/AppHeader";

const Index = () => {
  const theme = useTheme();
  
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
            <Grid
              item
              container
              alignItems={"stretch"}
              flexWrap={"nowrap"}
              sx={{
                flexDirection:{
                  xs: "column",
                  md: "row"
                }
              }}
              columns={16}
            >
              <Grid
                item
                container
                flexDirection={"column"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                rowSpacing={2}
                sx={{
                  order:{
                    xs: 2,
                    md: 1
                  },
                  mt: {
                    xs: 0,
                    md: 4
                  },
                  mb: {
                    xs: 0,
                    md: 4
                  },
                  pt: 3,
                  pb: 5,
                  pl: 5,
                  pr: 5,
                  backgroundColor: `rgba(255,255,255,0.15)`
                }}
                xs={16}
                md={5}
              >
                <Grid item>
                  <Typography
                    textAlign={"left"}
                    sx={{
                      fontSize: "1.2rem"
                    }}
                  >Ely is an artist based out of South Florida.  Blending melodic vocals, catchy flows and witty wordplay, he delivers a sound that is authentic to himself. After a year away, he's back.</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "1.2rem"
                    }}
                  >This is Ely's Genesis Collection.</Typography>
                </Grid>
                <Grid
                  item
                  container
                  flexDirection={"column"}
                  rowSpacing={2}
                >
                  <Grid item>
                  
                  </Grid>
                  <Grid item>
                    <Button
                      variant={"contained"}
                      sx={{
                        color: `#FFFFFF`,
                        padding: `16px 24px`,
                        textTransform: `uppercase`,
                        borderRadius: '0px',
                        backgroundColor: theme.palette.secondary.main
                      }}
                    >Mint</Button>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "1.3rem"
                      }}
                    >Cost: 0.05 ETH</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                flexGrow={2}
                xs={16} md={11}
                sx={{
                  order:{
                    xs: 1,
                    md: 2
                  }
                }}
              >
                <img
                  alt={"Ely Official Music"} src={require("../images/ely_hires.jpeg")}
                  style={{
                    width: theme.breakpoints.down('md') ? '100%' : '80%',
                    maxWidth: "1024px",
                    height: "auto"
                  }}
                />
              </Grid>
            </Grid>
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
  
}

export default Index;
