package api

import (
	"context"
	"github.com/google/go-github/v48/github"
	"github.com/gin-gonic/gin"
)

func (d *Data) Get(c *gin.Context) {
	d.GetData(c)
	d.GetSvg(c)
	c.JSON(200, d)
}

func (d *Data) GetData(c *gin.Context) {
	name := c.DefaultQuery("name", "Google")
	user := github.NewClient(nil).Users
	uResp, _, _ := user.Get(context.Background(), name)
	d.User.SetUser(uResp)
}

func (d *Data) GetSvg(c *gin.Context) {
	svg := c.DefaultQuery("raw", "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100' width='200' height='100'><style> @keyframes anime { from { transform: translate(0%, 0%); } to { transform: translate(50%, 100%); } } .rect { fill: white; stroke: black; stroke-width: 3; } .hello { fill: red; animation: anime 3s both 1s infinite; } </style><rect width='200' height='100' rx='10' ry='10' class='rect'></rect><text x='10' y='30' class='hello'>Hello World</text></svg>")
	d.Svg.Encode(svg)
	enc := c.DefaultQuery("enc", "dJFBbsMgEEWv8jcRrdQaEqsbB6Oqq96ga5Jgg4JNBaNgK8rdKxy3XWU1g3h/eIBMlx7T4MfUMkv03XCec65yXYXY850QgqdLz3BxJn+EqWUCAjshsBWCIbsT2ZbtSm+N6y21rGwomWj2RuH9bOYu6sEk6NENBld0MQy4gqIeUxfi0Nxbr8k8ic0LxOZ5jxsoPILeCrUVK3dDFc2RymDnfYNsHZk9EsVwNg0OXh/Pv8vXxbdBXYKVNd6Hv1w0p/3iqMmFsVl164RDIIttghs7Ny6zb5D8fj+5HP3oFRCn0jDE+V6PXqfUshJiSvJSlSQzEVZwbln9zy2CTH0unl8h+pPkhVay/In6CQAA//8=")
	d.Svg.Decode(enc)
}