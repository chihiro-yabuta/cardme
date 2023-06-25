package get

import (
	"fmt"
	"strings"
	"reflect"
)

func (d *Data) GitReplace() string {
	result := d.Svg
	typeOf := reflect.TypeOf(d.User)
	valueOf := reflect.ValueOf(d.User)
	for i := 0; i < typeOf.NumField(); i++ {
		f, v := typeOf.Field(i), valueOf.Field(i)
		result = strings.Replace(result, "{"+f.Name+"}", fmt.Sprint(v), -1)
	}
	return result
}