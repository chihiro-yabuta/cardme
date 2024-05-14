package get

import (
	"fmt"
	"strings"
	"reflect"
)

func (d *Data) gitReplace() string {
	result := d.svg
	typeOf := reflect.TypeOf(d.user)
	valueOf := reflect.ValueOf(d.user)
	for i := 0; i < typeOf.NumField(); i++ {
		f, v := typeOf.Field(i), valueOf.Field(i)
		result = strings.Replace(result, "{"+f.Name+"}", fmt.Sprint(v), -1)
	}
	return result
}