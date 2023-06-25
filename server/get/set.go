package get

import (
	"bytes"
	"compress/flate"
	"encoding/base64"
)

func (s *Svg) Decode(element string) {
	base, _ := base64.StdEncoding.DecodeString(element)
	var dec bytes.Buffer
	r := flate.NewReader(bytes.NewReader(base))
	dec.ReadFrom(r)
	r.Close()
	s.DecSvg = dec.String()
}