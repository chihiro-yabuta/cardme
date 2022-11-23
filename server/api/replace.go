package api

import (
	"fmt"
	"strings"
	"reflect"
)

func GitReplace(svg string, d *Data) string {
	result := svg
	typeOf := reflect.TypeOf(d.User)
	valueOf := reflect.ValueOf(d.User)
	for i := 0; i < typeOf.NumField(); i++ {
		f, v := typeOf.Field(i), valueOf.Field(i)
		result = strings.Replace(result, "{"+f.Name+"}", fmt.Sprint(v), -1)
	}
	return result
}