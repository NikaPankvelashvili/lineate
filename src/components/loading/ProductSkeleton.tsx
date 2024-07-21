import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const ProductSkeleton = ({ index }: { index: number }) => {
  return (
    <div className="w-4/5">
      <Box
        key={index}
        // sx={{ width: 210, marginRight: 0.5, my: 5 }}
        sx={{ width: 4 / 5, marginRight: 0.5, my: 5 }}
      >
        <Skeleton
          variant="rectangular"
          // width={full}
          height={118}
          sx={{ bgcolor: "#fff" }}
        />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton sx={{ bgcolor: "#fff" }} />
          <Skeleton width="60%" sx={{ bgcolor: "#fff" }} />
          <Skeleton width="40%" sx={{ bgcolor: "#fff" }} />
        </Box>
      </Box>
    </div>
  );
};

export default ProductSkeleton;
